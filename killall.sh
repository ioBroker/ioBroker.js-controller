sudo pgrep -f '^io.*' | sudo xargs kill -KILL
sudo pgrep -f '^node-red*' | sudo xargs kill -KILL