---
layout: post
title: Compiling PHP 5.4 on Ubuntu 12.04
tags: php compile ubuntu
---


So recently I’ve been working with PHP 5.4 a LOT. Unfortunately Ubuntu (my main dev environment) is behind the times. So I’m resorting to compiling PHP manually.

Not a daunting as it may first appear. The really tricky part is working out your dependencies and configure script.

Hence the reason for this post as a reminder for myself and others that may want to do a quick compile. (I would recommend that if your compiling for a production/live environment that you make sure you understand what it is your compiling though before just using what’s here)

So where to start. Dependencies first I think

Ubuntu allows you to install dependencies for building source apt-get build-deps. We will use this and install any extras we may need.

<pre class="line-numbers">
    <code class="language-shell">

    apt-get install \
    libxml2 \
    libxml2-dev \
    libssl-dev \
    pkg-config \
    curl \
    libcurl4-nss-dev \
    enchant \
    libenchant-dev \
    libjpeg8 \
    libjpeg8-dev \
    libpng12-0 \
    libpng12-dev \
    libvpx1 \
    libvpx-dev \
    libfreetype6 \
    libfreetype6-dev \
    libt1-5 \
    libt1-dev \
    libgmp10 \
    libgmp-dev \
    libicu48 \
    libicu-dev \
    mcrypt \
    libmcrypt4 \
    libmcrypt-dev \
    libpspell-dev \
    libedit2 \
    libedit-dev \
    libsnmp15 \
    libsnmp-dev \
    libxslt1.1 \
    libxslt1-dev
        
</code></pre>

And now the configure

<pre class="line-numbers">
    <code class="language-shell">

    ./configure \
    --prefix=/usr/local/php \
    --with-apxs2=/usr/local/apache2/bin/apxs \
    --enable-fpm \
    --with-fpm-user=www-data \
    --with-fpm-group=www-data \
    --with-config-file-path=/usr/local/php/conf \
    --with-config-file-scan-dir=/usr/local/php/conf.d \
    --enable-debug \
    --with-openssl \
    --with-kerberos \
    --with-zlib \
    --enable-calendar \
    --with-curl \
    --with-curlwrappers \
    --with-enchant \
    --enable-exif \
    --enable-ftp \
    --with-gd \
    --with-jpeg-dir=/usr \
    --with-png-dir=/usr \
    --with-vpx-dir=/usr \
    --with-freetype-dir=/usr \
    --with-t1lib \
    --enable-exif \
    --enable-gd-native-ttf \
    --enable-gd-jis-conv \
    --with-gettext \
    --with-gmp \
    --with-mhash \
    --enable-intl \
    --enable-mbstring \
    --with-mcrypt \
    --with-mysql \
    --with-mysqli \
    --enable-pcntl \
    --with-pdo-mysql \
    --with-pdo-pgsql \
    --with-pgsql \
    --with-pspell \
    --with-libedit \
    --with-readline \
    --enable-shmop \
    --with-snmp \
    --enable-soap \
    --enable-sockets \
    --enable-sysvmsg \
    --enable-sysvshm \
    --with-xsl \
    --enable-zip \
    --with-pear \
    --enable-zend-signals \
    --enable-maintainer-zts

</code>
</pre>

Once these are done then we follow the standard make process. Notice we are also running make test… very important as it givges more data for the developers to work with.

    Make PHP
    make && make test && make install
1
	
    make && make test && make install

The next thing is configuring your php.ini file as the install doesn’t have one yet so we copy either the production or development default from the source code to the new conf dir and edit to suit your needs.

    Shell
    cp {<a href="http://www.php.net/" title="PHP" target="_blank">php</a>-source-dir}/<a href="http://www.php.net/" title="PHP" target="_blank">php</a>.ini-(development|production) /usr/local/<a href="http://www.php.net/" title="PHP" target="_blank">php</a>/conf
1
	
    cp {php-source-dir}/php.ini-(development|production) /usr/local/php/conf

Thats it. All ready to roll… almost, this installation is the one I use for use with a webserver so you will want to add the appropriate directives to apache.

Shell
    LoadModule php5_module modules/libphp5.so AddHandler php5-script .<a href="http://www.php.net/" title="PHP" target="_blank">php</a> AddType text/html .<a href="http://www.php.net/" title="PHP" target="_blank">php</a>
      
    LoadModule php5_module        modules/libphp5.so
 
    AddHandler php5-script .php
    AddType text/html .php