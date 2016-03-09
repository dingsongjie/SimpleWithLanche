using Lanche.Cache;
using Lanche.DynamicWebApi.Application;
using MongoDb;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading;
using System.Threading.Tasks;

namespace BizTest
{
    /// <summary>
    /// 简单缓存示例  如果使用 redis 请先安装 redis
    /// </summary>
    public class SimpleCacheBiz : ApplicationBizBase
    {
        private readonly ICacheManager cacheManager;

        public SimpleCacheBiz(ICacheManager cacheManager)
        {
            this.cacheManager = cacheManager;
            
        }
        // url  /api/services/simple/simplecache/setone
        public void SetOne()
        {

            var cache = cacheManager.GetOrCreateCache("test1");
            cache.Set("Id", 123456, new TimeSpan(1, 0, 0));
        }
        // url  /api/services/simple/simplecache/getone
        public int GetOne()
        {
            var cache = cacheManager.GetOrCreateCache("test1");
            return cache.GetOrDefault<string, int>("Id");
        }
        // url  /api/services/simple/simplecache/SetOneInRedis
        public void SetOneInRedis()
        {
            Car car = new Car() { Id = Guid.NewGuid(), Name = "111" };
            var cache = cacheManager.GetOrCreateCache("test1");

            cache.SetAsync("Id", car);

          
        }
        // url  /api/services/simple/simplecache/GetOneInRedis
        public async Task<Car> GetOneInRedis()
        {
            var cache = cacheManager.GetOrCreateCache("test1");
            var value = await cache.GetOrCreateAsync<Car>("Id", new Car() { Id = Guid.NewGuid(), Name = "222" });
            return value;
        }
    }
}
