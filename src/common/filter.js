import Vue from 'vue'
import moment from 'moment';
Vue.use(moment);

Vue.filter('formatCurrency', function (value) {
    return '₹ ' + parseFloat(value).toFixed(2);
})

Vue.filter('formatDate', function (value) {
    if (value) {
        return moment(String(value)).format('MM/DD/YYYY');
    }
})
