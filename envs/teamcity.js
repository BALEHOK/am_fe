module.exports = {
  APIURL: JSON.stringify('#{if APIURL}#{APIURL}#{/if}'),
  AUTHURL: JSON.stringify('#{if AUTHURL}#{AUTHURL}#{/if}'),
};
