import { Blog } from '../../typings';
import { ArticleListItem } from '../ArticleListItem';
import { ReactPaginate } from 'react-paginate';

export interface ArticleList {
  allBlogs: Blog[];
}

export const ArticleList: React.FC<ArticleList> = ({
  allBlogs,
}) => {

  return (
    <div className="article-list">
      {allBlogs.map((item) => {
        return (<ArticleListItem
          title={item.title}
          url={`/blog/${item.slug}`}
          excerpt={item.excerpt}
          tags={item.tags}
          date={item.date}
        />);
      })}

      
    </div>
  );
};
