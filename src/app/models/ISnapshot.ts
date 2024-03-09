interface SnapInfo {
    name: string;
    height: number;
    size: number;
    time: number;
}

interface ISnapshot {
    latest: SnapInfo;
    past: SnapInfo;
    peers: string;
}
