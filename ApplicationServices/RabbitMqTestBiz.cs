using Lanche.DynamicWebApi.Application;
using Lanche.MessageQueue;
using Lanche.MessageQueue.Abstractions;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BizTest
{
    public class SimpleMqBiz : ApplicationBizBase
    {
        private readonly IMessageQueryManager _manager;
        public SimpleMqBiz(IMessageQueryManager manager)
        {
            this._manager = manager;
            
        }
        // url  /api/services/simple/SimpleMq/Send
        public void Send()
        {
            var channel = _manager.GetChannal("test1");
            channel.Send("test", "hellow");
           
          
        }
    }
}
