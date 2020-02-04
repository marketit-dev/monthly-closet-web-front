
import * as React from 'react'
import ActivityIndicator from './ActivityIndicator'
// eslint-disable-next-line no-unused-vars
import { LoadingComponentProps } from 'react-loadable'

function Loading(props: LoadingComponentProps) {
  if (props.error) {
    return <div>Error!</div>
  }
  return <ActivityIndicator />
}

export default Loading