#!/bin/bash
if (( $EUID != 0 )); then
    echo "Please run as root"
    exit
fi

echo '_, _  _, ___ _,_ _ _, _  _,   __, _,_ ___   __, __, _, _  _, _, _  _,'
echo '|\ | / \  |  |_| | |\ | / _   |_) | |  |    | \ |_  |\/| / \ |\ | (_ '
echo '| \| \ /  |  | | | | \| \ /   |_) | |  |    |_/ |   |  | \ / | \| , )'
echo '~  ~  ~   ~  ~ ~ ~ ~  ~  ~    ~   `~   ~    ~   ~~~ ~  ~  ~  ~  ~  ~ '
                                                                 
echo "Welcome to the Nothing but Demons installer."
echo "Where would you like to have it installed?"
read -rp '> ' INSTALLATION_LOCATION
INSTALLATION_LOCATION=${INSTALLATION_LOCATION/#~/$HOME}
echo "$INSTALLATION_LOCATION"

if [ ! -f /tmp/master.zip ]; then
    wget -O /tmp/master.zip https://github.com/Peter-van-der-Velde/c3/archive/master.zip
fi

if [ ! -e "$INSTALLATION_LOCATION" ]; then
    mkdir -v "$INSTALLATION_LOCATION"
fi

cd /tmp/
rm -rv /tmp/c3-master
unzip /tmp/master.zip
cp -rv c3-master/* "$INSTALLATION_LOCATION"
rm -rv /tmp/c3-master

rm /usr/bin/nothing-but-demons
ln -s "$INSTALLATION_LOCATION/nothing-but-demons" /usr/bin/
chmod 755 /usr/bin/nothing-but-demons
chmod 777 "$INSTALLATION_LOCATION"

echo ""
echo "installation is complete,"
echo "to run it simply run: $ nothing-but-demons"