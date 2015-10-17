sudo pgrep -f '^io.*' | sudo xargs kill -9
sudo pgrep -f '^node-red*' | sudo xargs kill -9