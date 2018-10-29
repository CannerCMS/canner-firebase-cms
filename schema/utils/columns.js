import React from 'react';
import {Tag} from 'antd';
import moment from 'moment';

export function renderUrl(text) {
  if (text) {
    return <a href={`https://${text}`}>https://{text}</a>;
  } else {
    return '-';
  }
}

export function renderStatus(text, record) {
  const {publish, trash, draft} = record;
  if (trash) {
    return <Tag color="red">Trashed</Tag>
  }
  if (draft) {
    return <Tag color="orange">Draft</Tag>
  }
  if (!publish || publish.type === 'now' || moment(publish.date).unix() < moment().unix()) {
    return <Tag color="green">Published</Tag>;
  }
  return <Tag color="blue">Scheduled: {moment(publish.date).format('YYYY/MM/dd')}</Tag>;
}

export function renderCategory(category, record, cannerProps) {
  const {goTo} = cannerProps;
  if (!category) {
    return '-';
  } else {
    return <a href="javascript:;" onClick={() => goTo({pathname: `/category/${category.id}`})}>{category.name}</a>
  }
}
