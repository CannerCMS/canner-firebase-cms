import React from 'react';
import {Tag} from 'antd';

export function renderUrl(text) {
  if (text) {
    return <a href={text}>{text}</a>;
  } else {
    return '-';
  }
}

export function renderStatus(text, record) {
  const {publish, draft, trash} = record;
  if (trash) {
    return <Tag color="red">Trashed</Tag>
  } else if (publish) {
    return <Tag color="green">Published</Tag>;
  } else {
    return <Tag color="blue">Draft</Tag>
  }
}

export function renderCategory(category, record, cannerProps) {
  if (!category) {
    return '-';
  } else {
    return <a href="javascript;" onClick={() => goTo(`/category/${category.id}`)}>{category.name}</a>
  }
}
