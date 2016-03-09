﻿using System;
using System.Threading.Tasks;
using Microsoft.Owin;
using Owin;
using Lanche.Web;
using Lanche.Log;
using Lanche.MemoryCache;
using Lanche.Redis.RedisCache;
using Lanche.RabbitMq;

[assembly: OwinStartup(typeof(SimpleDemo.Startup))]

namespace SimpleDemo
{
    public class Startup
    {
        public void Configuration(IAppBuilder app)
        {
            /// lanche web entry
            app.UseLancheProject()
                /// log
               .UseLog4Net("log4net.config")
                /// cache
               .UseMemoryCache()
                ///    这里 use 两个缓存  后者覆盖前者
               .UseRedisCache("Lanche.Redis.Cache")
               .UseRabbitMq()
               .UseMqConnection("test1");
        }
    }
}
