cd /opt/doc-auto
/usr/bin/git pull
cp engine/update.sh ../updateSite.sh
chmod 744 ../updateSite.sh
cd engine/front-end/docu
/usr/bin/git pull
cd ../../..
cd engine/
/usr/bin/npm i
/usr/bin/node node_modules/gulp/bin/gulp.js buildOnly
/usr/bin/pm2 restart doc
