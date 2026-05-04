#!/bin/sh
set -e

cd /var/www

# Create SQLite DB if it doesn't exist
if [ ! -f database/campaign365.sqlite ]; then
    touch database/campaign365.sqlite
    php artisan migrate --force
    php artisan db:seed --force
    echo "Database initialized with seed data"
fi

# Cache configs
php artisan config:cache
php artisan route:cache

# Start supervisor (nginx + php-fpm + queue)
exec /usr/bin/supervisord -c /etc/supervisor/conf.d/supervisord.conf
