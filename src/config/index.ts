const serverType: string = process.env.NODE_ENV;

const domainObject: {
    [key: string]: string
} = {
    production: "http://127.0.0.1:8100/",
    development: "http://192.168.0.12:8100/",
};

export const hostDomain: string = domainObject[serverType];
