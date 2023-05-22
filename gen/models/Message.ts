/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

export type Message = {
    /**
     * ID
     */
    id: string;
    /**
     * プッシュ日時
     */
    publishedAt: number;
    /**
     * ステータス
     */
    status: Message.status;
    /**
     * 真偽値
     */
    bool?: boolean;
};

export namespace Message {

    /**
     * ステータス
     */
    export enum status {
        OK = 'ok',
        NG = 'ng',
    }


}

