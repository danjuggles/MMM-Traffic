'use strict';

/* Magic Mirror
 * Module: MMM-Traffic
 *
 * By Sam Lewis https://github.com/SamLewis0602
 * MIT Licensed.
 */

const NodeHelper = require('node_helper');
var request = require('request');

module.exports = NodeHelper.create({
  start: function () {
    this.url = '';
  },

  getCommute: function() {
    var self = this;
    request({url: this.url, method: 'GET'}, function(error, response, body) {
      if (!error && response.statusCode == 200) {
        var commute = JSON.parse(body).routes[0].legs[0].duration_in_traffic.value;
        self.sendSocketNotification('TRAFFIC_COMMUTE', commute);
      }
    })
  },

  // Subclass socketNotificationReceived received.
  socketNotificationReceived: function(notification, payload) {
    console.log(notification);
    console.log(payload);
    if (notification === 'TRAFFIC_URL') {
      this.url = payload;
      this.getCommute();
    }
  }

});
