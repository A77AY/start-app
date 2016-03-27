import React from 'react'
import {render} from 'react-dom'
import {Router, browserHistory} from 'react-router'
import AsyncProps from 'async-props'
import routes from '_/routes'

render(<Router history={browserHistory}
               render={(props) => <AsyncProps {...props}/>}>{routes}</Router>, document.getElementById('app'));