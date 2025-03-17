@servers(['localhost' => ['127.0.0.1'], 'uat' => ['venus-pos@159.223.68.244']])

@task('deploy', ['on' => 'uat'])
    cd /home/venus-pos/webapps/venus-pos-uat
    git restore .
    git pull
    composer install
    php artisan migrate --force
    pnpm install
    pnpm build
    php artisan optimize:clear
@endtask
