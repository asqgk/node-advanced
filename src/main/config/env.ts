export const env = {
  facebookApi: {
    clientId: process.env.FB_CLIENT_ID ?? '506085731720152',
    clientSecret: process.env.FB_CLIENT_SECRET ?? '6369f79f6126c1882d0310df02e97b62'
  },
  port: process.env.PORT ?? 8080,
  jwtSecret: process.env.JWT_SECRET ?? 'awuhawiuhaxshuh'
}
