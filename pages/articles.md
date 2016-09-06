---
title: Статьи
description:
---


# Articles

<div class="b-articles-wrapper">
  <% collections.articles.forEach(article => { %>
    <div class="b-article">
      <a href="/<%= article.path %>"><%= article.title %></a>
      <div class="b-article__introtext">
        <%= article.introtext %>
      </div>
    </div>
  <% }) %>
</div>
