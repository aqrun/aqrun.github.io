use once_cell::sync::Lazy;
use regex::Regex;

// Based on https://regex101.com/r/H2n38Z/1/tests
// A regex parsing RFC3339 date followed by {_,-} and some characters
pub static RFC3339_DATE: Lazy<Regex> = Lazy::new(|| {
    Regex::new(
      r"^(?P<datetime>(\d{4})-(0[1-9]|1[0-2])-(0[1-9]|[12][0-9]|3[01])(T([01][0-9]|2[0-3]):([0-5][0-9]):([0-5][0-9]|60)(\.[0-9]+)?(Z|(\+|-)([01][0-9]|2[0-3]):([0-5][0-9])))?)\s?(_|-)(?P<slug>.+$)"
  ).unwrap()
});

pub fn generate_slug(file_name: &str) -> (String, String) {
    let (date_time, slug) = slugify_paths_without_date(file_name);
    (date_time, slug)
}

pub fn is_valid_matter_content(content: &str) -> bool {
    let reg_matter = Regex::new(r#"---([\s\S]*)---"#).expect("Matter reg not valid");
    reg_matter.is_match(content)
}

/// 去除文件名的日期
pub fn slugify_paths_without_date(s: &str) -> (String, String) {
    let mut date_time = String::new();
    let captured_file = capture_file_name(s);
    let mut file_path = String::from(captured_file.file_stem.as_str());

    // 正则匹配包含日期的文件名 无日期则不会匹配
    if let Some(caps) = RFC3339_DATE.captures(file_path.as_str()) {
        if let Some(s) = caps.name("datetime") {
            date_time = s.as_str().to_string();
        }
        if let Some(s) = caps.name("slug") {
            file_path = s.as_str().to_string();
        }
    }
    // 将unicode转为ascii
    let res_slug = slug::slugify(file_path.as_str());
    (date_time, res_slug)
}
