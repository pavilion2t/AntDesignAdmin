import React from 'react';
import ReactDOM from 'react-dom';

import App from './app'
import home from './js/home'

import loginPage from './js/loginPage'
import TestPage from './js/TestPage.js'

import ManagePerson from './js/backendManage/personManage/ManagePerson.js'
import BranchManage from './js/backendManage/branchManage/BranchManage.js'
import BranchBase from './js/backendManage/branchManage/BranchBase.js'
import manageDevice from './js/backendManage/manageDevice.js'
import manageSurvey from './js/backendManage/manageSurvey.js'

import CheckInfo from './js/backendManage/personManage/CheckInfo.js'
import DeviceProcess from './js/backendManage/DeviceProcess.js'
import CourseManage from './js/backendManage/courseManage/CourseManage.js'
import InfomationManage from './js/backendManage/infomation/InfomationManage.js'
import ProcessDetail from './js/backendManage/ProcessDetailPage.js'
import SendMsg from './js/backendManage/SendMsg.js'
import CheckStandard from './js/backendManage/branchCheck/CheckStandard.js'
import StandardManage from './js/backendManage/branchCheck/StandardManage.js'
import PersonStrcAnalysis from './js/dataAnalysis/personAnalysis/PersonStrcAnalysis.js'
import AddInformation from './js/backendManage/infomation/AddInformation.js'
import { Router,Route,browserHistory,IndexRoute,IndexRedirect} from 'react-router';
import "./css/common.css"

ReactDOM.render((
  <Router history={browserHistory}>
     <Route path="/" component={App}>

        <IndexRoute component={loginPage}/>
        <Route path="login" component={loginPage}/>
        <IndexRedirect to="login"/>
        <Route path="home" component={home}>

            <Route path="ManagePerson" component={ManagePerson}/>
            <Route path="BranchManage" component={BranchManage}/>
            <Route path="BranchBase" component={BranchBase}/>
            <Route path="manageDevice" component={manageDevice}/>
            <Route path="manageSurvey" component={manageSurvey}/>
            <Route path="deviceProcess" component={DeviceProcess}/>
            <Route path="processDetail" component={ProcessDetail}/>
            <Route path="sendMsg" component={SendMsg}/>
            <Route path="checkStandard" component={CheckStandard}/>
            <Route path="standardManage" component={StandardManage}/>

            <Route path="CheckInfo" component={CheckInfo}/>

            <Route path="CourseManage" component={CourseManage}/>

            <Route path="InfomationManage" component={InfomationManage}/>

            <Route path="personStrcAnalysis" component={PersonStrcAnalysis}/>

            <Route path="addInformation" component={AddInformation}/>

            {/*<Route path="DispatchTask" component={DispatchTask}/>
            <Route path="AutoDeploy" component={App}>
                <IndexRoute component={AutoDeploy}/>
                <Route path="DeployHistory" component={DeployHistory}/>
            </Route>
            <Route path="businessSystem" component={businessSystem}/>
            <Route path="edit" component={editPage}/>
            <Route path="personTable" component={personTable}/>
            <Route path="rechart" component={rechart}/>
            <Route path="addPerson" component={addPerson}/>
            <Route path="wizard" component={wizard}/>
            <Route path="testPage" component={testPage}/>*/}
    	   </Route>
    </Route>
  </Router>
), document.getElementById('app'));
