var fs = require("fs");

const getContent = user => `
'use strict';

var util = require('util');
module.exports = {
  src: './*.{png,gif,jpg}',
  destImage: './${user}-out.png',
  destCSS: './${user}-out.css',
  imgPath: '/${user}-out.png',
  padding: 2,
  algorithm: 'top-down',
  algorithmOpts: { sort: false },
  cssOpts: {
    cssClass: function (item) {
      return util.format('.ic-%s', item.name);
    }
  }
};`;

const userList = [
  '2_sac',
  '7cit',
  'a3_yuu',
  'abcde_find',
  'allkavt',
  'ark_misha',
  'azuritelab',
  'butadiene121',
  'coquelicots_wot',
  'c_colloid',
  'fotfla',
  'gatosyocora',
  'himazin917',
  'hoke946',
  'hosikuzuwitch',
  'kajitaj63b3',
  'kanonji',
  'karasu_ma_kuro',
  'kayanomicha',
  'kohack_v',
  'koyuri_vrchat',
  'kuzusaki',
  'lowteq_vr',
  'lunatic_movie',
  'momoandbanana22',
  'nagisano_kanade',
  'outerdotvr',
  'phi16_',
  'sansuke05_vr',
  'san_kaku_vrc',
  'sersz7',
  'shoninvrc',
  'siodome0',
  'suna_vrc',
  'tenteeeee_vrc',
  'tsubasa9317',
  'uozumi2390',
  'vrmorocco',
  'vr_hekisan',
  'yossy222_vrc',
];

userList.forEach((user) => {
  fs.mkdirSync(`out/${user}`);

  fs.writeFile(`out/${user}/cobain-spritesmith.js`, getContent(user), (err, data) => {
    if(err) console.log(err);
    else console.log('write end');
  });
  fs.writeFile(`out/${user}/cobain.bat`, "npx spritesmith-cli --rc cobain-spritesmith.js", (err, data) => {
    if(err) console.log(err);
    else console.log('write end');
  });
})
