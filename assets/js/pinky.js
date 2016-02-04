/* Settings of Pinky */

const INFINITE_SCROLL = 0; // Turn on (1) or turn off (0) infinite scroll.
const INFINITE_SCROLL_EXCERPT_LIMIT_S = 128; // Number of characters in small screen infinite scroll excerpt section
const INFINITE_SCROLL_EXCERPT_LIMIT_M = 192; // Number of characters in medium screen infinite scroll excerpt section

/* External Services */
/* If you don't use the service, please leave it blank.*/

const GOOGLE_ANALYTICS_ID = ""; // Your Google Analytics Tracking ID (i.e. UA-12345678-1).
const DISQUS_SHORTNAME = ""; // Your Disqus shortname. Do not include '.disqus.com' at the end.

/* JavaScript Main Function */
$(document).ready(function () {
    
    "use strict";
    
    var loadType = $(".pinky-page-data").attr("data-page-type"),
        currentPage = parseInt($(".pinky-load-data").attr("data-page"), 10),
        previousPage = parseInt($(".pinky-load-data").attr("data-prev"), 10),
        nextPage = parseInt($(".pinky-load-data").attr("data-next"), 10),
        totalPage = parseInt($(".pinky-load-data").attr("data-pages"), 10),
        postLimit = parseInt($(".pinky-load-data").attr("data-limit"), 10),
        postTotal = parseInt($(".pinky-load-data").attr("data-total"), 10),
        pageTypeIndex = $(".pinky-load-data").attr("data-type-index"),
        pageTypeHome = $(".pinky-load-data").attr("data-type-home"),
        pageTypePost = $(".pinky-load-data").attr("data-type-post"),
        pageTypePage = $(".pinky-load-data").attr("data-type-page"),
        pageTypeTag = $(".pinky-load-data").attr("data-type-tag"),
        pageTypeAuthor = $(".pinky-load-data").attr("data-type-author"),
        pageTypePaged = $(".pinky-load-data").attr("data-type-paged"),
        pageTypePrivate = $(".pinky-load-data").attr("data-page-private"),
        authorId = parseInt($(".pinky-author-data").attr("data-id"), 10),
        tagId = parseInt($(".pinky-tag-data").attr("data-id"), 10),
        pageUrl = $(".pinky-load-data").attr("data-url"),
        pageUrlSplit = pageUrl.split("/"),
        blogUrl = $(".pinky-load-data").attr("data-blog-url"),
        whileCount = 0,
        infiniteScrollStatus = false;
    pageUrlSplit.splice(0, 1);
    pageUrlSplit.splice(pageUrlSplit.length - 1, 1);
    
    /* Detect the page is Infinite Scroll available or not */
    if ((pageTypeTag === "yes") || (pageTypeAuthor === "yes")) {
        loadType = "no-loop";
    }
    
    /* Delete the "/" at the end of blog url */
    if (blogUrl.charAt(blogUrl.length - 1) === "/") {
        blogUrl = blogUrl.substring(0, blogUrl.length - 1);
    }
    
    /* Delete the beginning "http:" */
    blogUrl = blogUrl.replace(/http:/i, "");
    
    /* Rewrite the data format from JSON to normal format */
    function jsonDateToNormal(jsonDate) {
        var normalDate;
        switch (jsonDate.substring(5, 7)) {
        case "01":
            normalDate = "January";
            break;
        case "02":
            normalDate = "February";
            break;
        case "03":
            normalDate = "March";
            break;
        case "04":
            normalDate = "April";
            break;
        case "05":
            normalDate = "May";
            break;
        case "06":
            normalDate = "June";
            break;
        case "07":
            normalDate = "July";
            break;
        case "08":
            normalDate = "August";
            break;
        case "09":
            normalDate = "September";
            break;
        case "10":
            normalDate = "October";
            break;
        case "11":
            normalDate = "November";
            break;
        case "12":
            normalDate = "December";
            break;
        }
        normalDate += ' ' + jsonDate.substring(8, 10) + ' ' + jsonDate.substring(0, 4);
        return normalDate;
    }
    
    /* Write HTML to the infinite scroll page */
    function infiniteScroll(processingPage) {
        function writeHTML(dataObject) {
            var processingLimit = postLimit,
                i,
                j;
            if (dataObject.length < processingLimit) {
                processingLimit = dataObject.length;
            }
            for (i = 0; i < processingLimit; i += 1) {
                var lineToWrite,
                    cleanHTML = dataObject[i].html.replace(/(<([^>]+)>)/ig, "");
                lineToWrite = '<article class="post pinky-loop-s-article pinky-s-only pinky-url-trigger"><div class="pinky-loop-s-article-container ';
                if (dataObject[i].image !== null) {
                    lineToWrite += 'pinky-loop-s-article-image-container';
                } else {
                    lineToWrite += 'pinky-loop-s-article-no-image-container';
                }
                lineToWrite += '" ';
                if (dataObject[i].image !== null) {
                    lineToWrite += 'style="background-image: url(' + dataObject[i].image + ')"';
                }
                lineToWrite += '><div class="pinky-loop-s-article-inside-container ';
                if (dataObject[i].image !== null) {
                    lineToWrite += 'pinky-loop-s-article-inside-image-container';
                } else {
                    lineToWrite += 'pinky-loop-s-article-inside-no-image-container';
                }
                lineToWrite += '"> <header class="pinky-loop-s-header"><div class="pinky-loop-s-title-container"><div class="pinky-loop-s-title"><h2 class="pinky-loop-s-title-h2"><a class="pinky-url-trigger-target" href="' + blogUrl + dataObject[i].url + '">' + dataObject[i].title + '</a></h2></div>';
                if (dataObject[i].featured === true) {
                    lineToWrite += '<div class="pinky-loop-s-featured"><span class="pinky-loop-s-featured-heart"><i class="fa fa-heart pinky-featured-s-heart"></i></span></div>';
                }
                lineToWrite += '</div></header><section class="pinky-loop-s-excerpt"><p class="pinky-loop-s-excerpt-p"><a class="pinky-loop-s-article-link pinky-s-only" href="' + blogUrl + dataObject[i].url + '">' + cleanHTML.substring(0, INFINITE_SCROLL_EXCERPT_LIMIT_S) + '...</a></p></section></div></div></article><article class="post pinky-loop-m-article pinky-m-only"><div class="pinky-loop-m-article-container"><div class="pinky-loop-m-header-container"> <header class="pinky-loop-m-header"><div class="pinky-loop-m-header-inside-container"><div class="pinky-loop-m-meta-container"><div class="pinky-loop-m-meta"><div class="pinky-loop-m-title"> <h2 class="pinky-loop-m-title-h2"><a class="pinky-loop-m-article-link" href="' + blogUrl + dataObject[i].url + '">' + dataObject[i].title + '</a></h2></div><div class="pinky-loop-m-tags"><h6 class="pinky-loop-m-tags-h6">';
                for (j = 0; j < dataObject[i].tags.length; j += 1) {
                    lineToWrite += '<a href="' + blogUrl + '/tag/' + dataObject[i].tags[j].slug + '/">' + dataObject[i].tags[j].name + '</a>';
                    if (j + 1 < dataObject[i].tags.length) {
                        lineToWrite += ', ';
                    }
                }
                lineToWrite += '</h6></div><div class="pinky-loop-m-time"><p class="pinky-loop-m-time-p">' + jsonDateToNormal(dataObject[i].published_at) + '</p></div><div class="pinky-loop-m-author"><div class="pinky-loop-m-author-image-container">';
                if (dataObject[i].author.image !== null) {
                    lineToWrite += '<a class="pinky-loop-m-author-link" href="' + blogUrl + '/author/' + dataObject[i].author.slug + '/"><img class="pinky-loop-m-author-image" src="' + dataObject[i].author.image + '" alt="' + dataObject[i].author.name + '"></a>';
                }
                lineToWrite += '</div><div class="pinky-loop-m-author-name"><p>by <a class="pinky-loop-m-author-link" href="' + blogUrl + '/author/' + dataObject[i].author.slug + '/">' + dataObject[i].author.name + '</a></p></div></div></div><div class="pinky-loop-m-featured-container"><div class="pinky-loop-m-featured">';
                if (dataObject[i].featured === true) {
                    lineToWrite += '<span class="pinky-loop-m-featured-heart"><i class="fa fa-heart fa-2x pinky-featured-m-heart"></i></span>';
                }
                lineToWrite += '</div></div></div></div></header></div><div class="pinky-loop-m-excerpt-container url-trigger"><section class="pinky-loop-m-excerpt"><div class="pinky-loop-m-cover"><a class="pinky-loop-m-article-link pinky-url-trigger-target" href="' + blogUrl + dataObject[i].url + '">';
                if (dataObject[i].image !== null) {
                    lineToWrite += '<img class="pinky-loop-m-cover-img" src="' + dataObject[i].image + '" alt="' + dataObject[i].title + '">';
                }
                lineToWrite += '</a></div><div class="pinky-loop-m-excerpt"><p class="pinky-loop-m-excerpt-p ';
                if (dataObject[i].image !== null) {
                    lineToWrite += 'pinky-loop-m-image-excerpt-p';
                } else {
                    lineToWrite += 'pinky-loop-m-no-image-excerpt-p';
                }
                lineToWrite += '"><a class="pinky-loop-m-article-link" href="' + blogUrl + dataObject[i].url + '">' + cleanHTML.substring(0, INFINITE_SCROLL_EXCERPT_LIMIT_M) + '...</a></p></div></section></div></div></article>';
                $(lineToWrite).insertBefore(".pinky-infinite-scroll-controller");
            }
            infiniteScrollStatus = false;
            $(".pinky-infinite-scroll-controller-loading").hide();
        }
        if (pageTypeIndex === "yes") {
            $.get(ghost.url.api("posts", {page: processingPage + 1, limit: postLimit, include: "author,tags"})).done(function (data) {
                writeHTML(data.posts);
            }).fail(function (err) {
                console.log(err);
            });
        }
    }
    
    /* Small Navigation */    
    var navSClick = false;
    $(".pinky-nav-s-title-container").click(function () {
        if (navSClick === false) {
            $(".pinky-nav-s-menu-container").slideDown();
            navSClick = true;
        } else {
            $(".pinky-nav-s-menu-container").slideUp();
            navSClick = false;
        }
    });
    
    /* Fixing Microsoft Edge Limitation */    
    $(".pinky-url-trigger").click(function () {
        window.location = $(this).find(".pinky-url-trigger-target").attr('href');
    });

    
    /* Infinite Scroll */
    /* Hide the Pagination if Inifinite Scroll is enabled */
    if (((INFINITE_SCROLL === 1) && (loadType === "loop")) || (totalPage === 1)) {
        $(".pinky-pagination").hide();
    }
    /* Check the window size is long enough to activate intinite scroll to load next page */
    while ((currentPage < totalPage) && (INFINITE_SCROLL === 1) && (loadType === "loop") && ($(window).height() === $(document).height()) && (infiniteScrollStatus === false)) {
        infiniteScrollStatus = true;
        $(".pinky-infinite-scroll-controller-loading").show();
        infiniteScroll(currentPage);
        currentPage += 1;
        /* Temporary turn off Infinite Scroll if the function cannot get the JSON object */
        if (whileCount > 8) {
            console.log("Infinite Scroll Error!");
            break;
        }
        whileCount += 1;
    }
    /* Check if the user scrolls the window bottom to the last post */
    $(window).scroll(function () {
        if ((loadType === "loop") && (INFINITE_SCROLL === 1) && (currentPage < totalPage) && (infiniteScrollStatus === false) && (($(window).scrollTop() + $(window).height() === $(document).height()) || (($(window).scrollTop() + $(window).height() >= $(".pinky-loop-m-article:last").offset().top)   && ($(".pinky-loop-m-article:last").offset().top > $(".pinky-loop-s-article-link:last").offset().top)) || (($(window).scrollTop() + $(window).height() >= $(".pinky-loop-s-article-link:last").offset().top) && ($(".pinky-loop-m-article:last").offset().top < $(".pinky-loop-s-article-link:last").offset().top)))) {
            infiniteScrollStatus = true;
            $(".pinky-infinite-scroll-controller-loading").show();
            infiniteScroll(currentPage);
            currentPage += 1;
        }
    });
    
    /* Check the sad face to smile face on the Error page */
    $(".pinky-error-page").hover(
        function () {
            $(".pinky-error-sad").hide();
            $(".pinky-error-smile").show();
        },
        function () {
            $(".pinky-error-smile").hide();
            $(".pinky-error-sad").show();
        }
    );
    
    /* Google Analytics */    
    if (GOOGLE_ANALYTICS_ID !== "") {
        var googleAnalyticsCode = "<script>(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)})(window,document,'script','//www.google-analytics.com/analytics.js','ga');ga('create', 'GOOGLE_ANALYTICS_ID', 'auto');ga('send', 'pageview');</script>";
        googleAnalyticsCode = googleAnalyticsCode.replace(/GOOGLE_ANALYTICS_ID/, GOOGLE_ANALYTICS_ID);
        $(googleAnalyticsCode).appendTo(".pinky-google-analytics");
    }
    
    /* Disqus */    
    if ((DISQUS_SHORTNAME !== "") && (pageTypePost === "yes")) {
        var disqusCode = '<div id="disqus_thread"></div><script>var disqus_config=function(){this.page.url=PAGE_URL,this.page.identifier=PAGE_IDENTIFIER};!function(){var e=document,t=e.createElement("script");t.src="//SITE_SHORTNAME.disqus.com/embed.js",t.setAttribute("data-timestamp",+new Date),(e.head||e.body).appendChild(t)}();</script>',
            postId = $(".pinky-page-data").attr("data-post-id"),
            postUrlAbs = $(".pinky-page-data").attr("data-post-url-abs");
        disqusCode = disqusCode.replace(/PAGE_URL/, "\"" + postUrlAbs + "\"");
        disqusCode = disqusCode.replace(/PAGE_IDENTIFIER/, "\"" + postId + "\"");
        disqusCode = disqusCode.replace(/SITE_SHORTNAME/, DISQUS_SHORTNAME);
        $(disqusCode).appendTo(".pinky-post-comments");
    } 
});