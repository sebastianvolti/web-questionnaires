if [ ${ENV} = "production" ]; then
    echo "###############################################"
    echo "production environment detected - Building resources..."
    echo "###############################################"
    yarn build
    yarn global add serve
fi
