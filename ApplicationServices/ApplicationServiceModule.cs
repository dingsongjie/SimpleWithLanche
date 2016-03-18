using Lanche.Core.Module;
using Lanche.DynamicWebApi;
using Lanche.DynamicWebApi.Application;
using Lanche.DynamicWebApi.Controller.Dynamic.Builders;
using Lanche.Entityframework;
using Lanche.MessageQueue;
using Lanche.MongoDB;
using Newtonsoft.Json.Serialization;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net.Http.Formatting;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace ApplicationServices
{
    [DependsOn(typeof(AbpWebApiModule)
        , typeof(EntityframeworkMudule)
        , typeof(MessageQueueModule)
        , typeof(MongoDbModule))]
    
    public class ApplicationServiceModule:Lanche.Core.Module. Module
    {
        public override void Initialize()
        {
            DynamicApiControllerBuilder.ForAll<ApplicationBizBase>(Assembly.GetExecutingAssembly(), "Simple").Build();
            var httpConfiguration = GlobalConfiguration.Configuration;
            // json 序列化风格
            httpConfiguration.Formatters.Remove(httpConfiguration.Formatters.JsonFormatter);
            var formatter = new JsonMediaTypeFormatter();
            formatter.SerializerSettings.ContractResolver = new DefaultContractResolver(); // 默认 Resolver
            httpConfiguration.Formatters.Add(formatter);

        }
    }
}
