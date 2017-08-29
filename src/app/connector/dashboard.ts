//大屏信息实体类
export class Dashboard {
    id: string;
    name: string;
    option: string;
    desc: string;
    content: string;
}

export class Block {
    left: number;
    top: number;
    width: number;
    height: number;
    content: any;
}
