/**
 * Created by jerry on 2017/4/13.
 */
import axiosHttp from '../common/axiosHttp'

export const requestLogin = params => { return axiosHttp.axiosPostNoHeader('/api/token/create.do', params) }

export const requestLoginAuth = params => { return axiosHttp.axiosPostNoHeader('/api/token/login/auth', params) }

export const requestUserByLoginName = params => { return axiosHttp.axiosPost('/service-ehr/user/findUserByLoginName.api', params) }


//////////////////////应用///////////////////////
export const requestAppList = params => { return axiosHttp.axiosPost('/api/cloud/app/list', params) }

export const requestAppDetail = params => { return axiosHttp.axiosPost('/api/cloud/app/detail', params) }

export const requestDeleteApp = params => { return axiosHttp.axiosPost('/api/cloud/app/delete', params) }

export const requestSubmitEditApp = params => { return axiosHttp.axiosPost('/api/cloud/app/edit', params) }

export const requestSubmitAddApp = params => { return axiosHttp.axiosPost('/api/cloud/app/add', params) }

export const requestAppAuthServiceList = params => { return axiosHttp.axiosPost('/api/cloud/app/serviceList', params) }

export const requestAppAuthHadServiceList = params => { return axiosHttp.axiosPost('/api/cloud/app/hadServiceList', params) }

export const requestAppAuthUpdate = params => { return axiosHttp.axiosPost('/api/cloud/app/auth', params) }

/////////////////////微服务////////////////////////
export const requestServiceList = params => { return axiosHttp.axiosPost('/api/cloud/service/list', params) }

export const requestServiceDetail = params => { return axiosHttp.axiosPost('/api/cloud/service/detail', params) }

export const requestDeleteService = params => { return axiosHttp.axiosPost('/api/cloud/service/delete', params) }

export const requestSubmitEditService = params => { return axiosHttp.axiosPost('/api/cloud/service/edit', params) }

export const requestSubmitAddService = params => { return axiosHttp.axiosPost('/api/cloud/service/add', params) }

/////////////////////Token管理////////////////////////
export const requestTokenList = params => { return axiosHttp.axiosPost('/api/cloud/token/list', params) }

/////////////////////用户权限管理////////////////////////
export const requestPermissionList = params => { return axiosHttp.axiosPost('/api/cloud/permission/list', params) }

export const requestUserAuthSearch = params => { return axiosHttp.axiosPost('/api/cloud/permission/userSearch', params) }

export const requestUserAuthHadPermission = params => { return axiosHttp.axiosPost('/api/cloud/permission/hadUserList', params) }

export const requestUserAuthUpdate = params => { return axiosHttp.axiosPost('/api/cloud/permission/auth', params) }

//////////////////////////网关日志/////////////////////////////
export const requestLogList = params => {return axiosHttp.axiosPost('/api/cloud/log/list',params)}

export const requestLogDelete = params => {return axiosHttp.axiosPost('/api/cloud/log/delete',params)}


