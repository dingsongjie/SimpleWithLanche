using Lanche.Core.Module;
using Lanche.DynamicWebApi;
using Lanche.DynamicWebApi.Application;
using Lanche.DynamicWebApi.Controller.Dynamic.Builders;
using Lanche.Entityframework;
using Lanche.MessageQueue;
using Lanche.MongoDB;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Reflection;
using System.Text;
using System.Threading.Tasks;

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



        }
    }
}
