export default (fn: Function, time: number) => {
    let flag: boolean = false;
    let timer: any = null;
    if (flag)
        return;
    flag = true;
    return function (this: any, ...args: any[]) {
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
            flag = false;
        }, time)
    }
}