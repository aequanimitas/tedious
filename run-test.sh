if [ ! -p test-code ]; then
    mkfifo test-code
fi

while true; do
    sh -c "$(cat test-code)"
done
