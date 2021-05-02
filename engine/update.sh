cd /opt/doc-auto
/usr/bin/git checkout .
/usr/bin/git pull
cp /opt/configBackup.json /opt/doc-auto/engine/config.json
cp engine/update.sh ../updateSite.sh
chmod 744 ../updateSite.sh
cd engine/
/usr/bin/npm i
/usr/bin/node node_modules/gulp/bin/gulp.js buildOnly
/usr/bin/pm2 restart doc

