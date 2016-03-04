using Lanche.Core.Dependency;
using Lanche.DynamicWebApi.Application;
using Lanche.MongoDB.DbContext;
using Lanche.MongoDB.Provider;
using Lanche.MongoDB.Repositories;
using MongoDb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace BizTest
{
    /// <summary>
    /// 注意安装 mongodb 然后 修改 web.config
    /// </summary>
    public class SimpleMongoBiz : ApplicationBizBase
    {
        private readonly IMongoDbRepository<Car> _carRepository;
        public IIocManager manager { get; set; }
        public SimpleMongoBiz(IMongoDbRepository<Car> carRepository)
        {
            this._carRepository = carRepository;
        }
        // url  /api/services/simple/SimpleMongo/Get
        public Car Get()
        {
           return _carRepository.Single(m => m.Name =="Alto");
        }
    }
}
