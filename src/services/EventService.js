import axios from "axios";
import NProgress from 'nprogress'

const apiClient = axios.create({
    baseURL : "http://10.10.10.22:3009",
    withCredentials:false,
    Accept:'application/json',
    'Content-Type':'application/json'
})
apiClient.interceptors.request.use(config => { // Called on request
    NProgress.start()
    return config
})
apiClient.interceptors.response.use(response => { // Called on response
  NProgress.done()
  return response
})
export default{
    getMessagesRequest(){
        console.log("here");
        return apiClient.get("/messages")
    },
    getExpensesRequest(){
        return apiClient.get("/expenses")
    },
    postExpensesRequest(expenseData){
        return apiClient.post("/expenses",{
        title: expenseData.title,
        amount: expenseData.amount,
        paidby: expenseData.paidby,
        files: expenseData.files,
        date: expenseData.date,
      })
    },
    deleteExpenseRequest(id){
        return apiClient.delete(`/expenses/${id}`)
    },
    userLoginRequest(username,password){
        return apiClient.get(`/users?username=${username}&password=${password}`);
    },
    sendMessageRequest(messageData){
        return apiClient.post("/messages", {
            message_text: messageData.messageBody,
            sent_from: messageData.sentFrom,
            sent_date: messageData.sentDate,
          });
    },
    userRegistrationRequest(RegistrationformData){
        return apiClient.post("/users",{
            name: RegistrationformData.name,
            email: RegistrationformData.email,
            username: RegistrationformData.username,
            password: RegistrationformData.password,
        })
    }
}