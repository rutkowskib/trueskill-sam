import 'lodash';

declare module 'lodash' {
    interface LoDashStatic {
        combinations(array: any[], size: number): any[]
    }
}