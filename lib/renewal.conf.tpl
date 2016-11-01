#cert = :configDir/live/:hostname/cert.pem
cert = :cert_path
privkey = :privkey_path
chain = :chain_path
fullchain = :fullchain_path

# Options and defaults used in the renewal process
[renewalparams]
apache_enmod = a2enmod
no_verify_ssl = False
ifaces = None
apache_dismod = a2dismod
register_unsafely_without_email = False
uir = None
installer = none
config_dir = :configDir
text_mode = True
# junk?
# https://github.com/letsencrypt/letsencrypt/issues/1955
func = <function obtain_cert at 0x30c9500>
prepare = False
work_dir = :work_dir
tos = :agree_tos
init = False
http01_port = :http_01_port
duplicate = False
# this is for the domain
key_path = :privkey_path
nginx = False
fullchain_path = :fullchain_path
email = :email
csr = None
agree_dev_preview = None
redirect = None
verbose_count = -3
config_file = None
renew_by_default = True
hsts = False
authenticator = webroot
domains = :hostnames #comma,delimited,list
rsa_key_size = :rsa_key_size
# starts at 0 and increments at every renewal
checkpoints = -1
manual_test_mode = False
apache = False
cert_path = :cert_path
webroot_path = :webroot_paths # comma,delimited,list
strict_permissions = False
apache_server_root = /etc/apache2
# https://github.com/letsencrypt/letsencrypt/issues/1948
account = :account_id
manual_public_ip_logging_ok = False
chain_path = :chain_path
standalone = False
manual = False
server = :acme_discovery_url
standalone_supported_challenges = "http-01,tls-sni-01"
webroot = True
apache_init_script = None
user_agent = None
apache_ctl = apache2ctl
apache_le_vhost_ext = -le-ssl.conf
debug = False
tls_sni_01_port = 443
logs_dir = :logs_dir
configurator = None
[[webroot_map]]
# :hostname = :webroot_path
