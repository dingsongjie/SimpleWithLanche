using Domain.EntityFramework;
using Lanche.Domain.Repository.Paging;
using Lanche.DynamicWebApi.Application;
using Lanche.Entityframework.UnitOfWork.Repository;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using UnitTest;
using Lanche.Domain.Repository;

namespace ApplicationServices.Curd
{
    public class StudentApplicationBiz:ApplicationBizBase
    {
        public IEfRepository<Student> DriverInfoRepository { get; set; }
        public IPagingRequestEntitySolover Slover { get; set; }
        public  virtual void InsertOrUpdate(Student student)
        {
            if (student.Id == null)
            {
                student.Id = Guid.NewGuid().ToString();
                  DriverInfoRepository.Insert(student);
            }
            else
            {
                 DriverInfoRepository.Update(student);
            }
            
        }

        public virtual void Delete(string id)
        {

            DriverInfoRepository.UpdateAsync(
                new Student()
                {
                    Id = id,
                    IsDeleted=true
                }
                );
        }
        public virtual PagingResultEntity<Student> GetList(PagingRequestEntity<Student> entity)
        {
            var result = Slover.Slover(entity);

            var pagingEntity = DriverInfoRepository.GetInPaging(m => string.IsNullOrEmpty(result.Query.Name) || m.Name == result.Query.Name , result.PageIndex, result.PageSize, result.OrderName, result.Sort);
            return new PagingResultEntity<Student>(pagingEntity, entity.Draw);


        }
        public async virtual Task<Student> GetSingle(string id)
        {
            return await DriverInfoRepository.SingleAsync(m => m.Id == id);
        } 
    }
}
