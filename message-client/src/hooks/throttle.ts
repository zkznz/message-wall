export default (fn: Function, time: number) => {
    let flag: boolean = true;
    let timer: any = null;
    if (!flag)
        return;
    flag = false;
    return function (this: any, ...args: any[]) {
        if (timer)
            clearTimeout(timer);
        timer = setTimeout(() => {
            fn.apply(this, args)
            flag = true;
        }, time)
    }
}