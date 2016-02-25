import Ember from 'ember';

export default Ember.Controller.extend({
	userSrv: Ember.inject.service('api/user/service'),
	actions:{
		loginAction: function() {
			var self = this;
        	var form = this.get("model.info");
        	self.get("userSrv").login(form).then(function(data) {
                if(data.Status==="success"){
                	/*
                    Ember.$.notify({
                    	message: "登录成功!"
                    }, {
                    	animate: {
                    		enter: 'animated fadeInRight',
                    		exit: 'animated fadeOutRight'
                    	},
                    	type: 'success'
                    });
                    */
                    self.get("userSrv").createLocalSession(data.Content);
                    self.transitionToRoute('dashboard.main');
                } else {
                    Ember.$.notify({
                    	title: "<strong>登录失败:</strong>",
                    	message: data.Message
                    }, {
                    	animate: {
                    		enter: 'animated fadeInRight',
                    		exit: 'animated fadeOutRight'
                    	},
                    	type: 'danger'
                    });
                }
            });
        },
	}
});
