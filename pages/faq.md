---
title: FAQ
description:
---


# FAQ

<div class="b-faq-wrapper">
  <% collections.faq.forEach(item => { %>
    <div class="b-faq">
        <div class="b-faq__name"><%= item.name %></div>
        <div class="b-faq__question"><%= item.question %></div>
        <div class="b-faq__answer"><%= item.contents %></div>
    </div>
  <% }) %>
</div>
