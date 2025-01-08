import React, {FC} from 'react';
import {TendermintContentProps} from "@/src/app/models/ITendermintContentProps";
import ContentItem from "@/src/entities/content-item/ContentItem";
import {NetworkType} from "@/src/app/models/INetwork";

const InjectiveBuild:FC<TendermintContentProps> = ({network, nodeVersion}) => {
    if (network.type === NetworkType.mainnet) {
        return (
            <ContentItem title={"BUILD BINARY"}>
                {`cd $HOME
git clone ${network.links.git_network_repo}
cd ${network.other.main_dir}
git fetch --tags
${nodeVersion && `git checkout $(git tag -l "v${nodeVersion}*" | sort -V | tail -n 1)`}
make install

${network.other.binary_name} version`}
            </ContentItem>
        );
    } else {
        return (
            <ContentItem title={"DOWNLOAD BINARY"}>
                {`cd $HOME
VERSION="v${nodeVersion}"
RELEASES_URL="https://api.github.com/repos/InjectiveLabs/testnet/releases"
RELEASE=$(curl -s $RELEASES_URL | jq -r --arg version "$VERSION" '.[] | select(.tag_name | startswith($version))')
ASSET_URL=$(echo "$RELEASE" | jq -r '.assets[] | select(.name | endswith("linux-amd64.zip")).browser_download_url')

curl -L -o linux-amd64.zip "$ASSET_URL"

mkdir -p $HOME/go/bin
unzip linux-amd64.zip -d $HOME/go/bin
rm -rf linux-amd64.zip

mv $HOME/go/bin/libwasmvm.x86_64.so $LD_LIBRARY_PATH

${network.other.binary_name} version`}
            </ContentItem>
        );
    }


};

export default InjectiveBuild;