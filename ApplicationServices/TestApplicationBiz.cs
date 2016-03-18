using Castle.Core.Logging;
using Domain.EntityFramework;
using Lanche.Core.Application;
using Lanche.Domain.Repository;
using Lanche.Domain.Repository.Paging;
using Lanche.DynamicWebApi.Application;
using Lanche.DynamicWebApi.Controller.Filters;
using Lanche.Entityframework.UnitOfWork.Repository;
using Lanche.UnitOfWork;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;


namespace UnitTest
{

    
    //localhost://api/services/Simple/test/
    public class TestApplicationBiz : ApplicationBizBase
    {
        private readonly IEfRepository<Student> _studentRepository;
        private readonly IUnitOfWorkManager _uowManger;
        private readonly ILogger _logger;

        public TestApplicationBiz(IEfRepository<Student> studentRepository, IUnitOfWorkManager uowManger,ILogger logger)
        {
            _studentRepository = studentRepository;
            _uowManger = uowManger;
            _logger = logger;
        }
        
        public virtual PagingEntity<Student> GetInPaging(int pageIndex, int PageSize, bool sort, string orderProperty)
        {
            _logger.Debug("ss");
            return _studentRepository.GetInPaging(m => m.IsDeleted == false, pageIndex, PageSize, orderProperty, sort);

        }
        // localhost://api/services/Simple/test/GetInPagingS
        [DefaultAuthorizeAttribute]
        public virtual List<Student> GetInPagingS()
        {

            var v = _studentRepository.GetAll().OrderBy(m => m.Age).Where(m => m.IsDeleted == false).Skip(1).Take(1).ToList();
            return v;
        }
        public virtual Student GetOne(string name)
        {
            return _studentRepository.Single(m => m.Name == name);
        }
        public virtual List<Student> GetList(string name)
        {
            return _studentRepository.GetAllList(m => m.Name != name);
        }
        public virtual int GetCount(string name)
        {
            return _studentRepository.Count(m => m.Name != name);
        }
        public virtual Student Add(Student s)
        {
            return _studentRepository.Insert(s);
        }
        public virtual void AddBulk(IEnumerable<Student> Student)
        {
            _studentRepository.BulkInsert(Student);

        }
        public virtual int DeleteLot(int age)
        {
            return _studentRepository.Delete(m => m.Age > age);
        }
        public virtual void Delete(Student s)
        {
            _studentRepository.Delete(s);
        }

        public virtual void Update(Student student)
        {
            _studentRepository.Update(student);
        }
        public virtual void UpdateLot(int age, string name)
        {
            _studentRepository.Update(m => m.Age > age, m => new Student() { Name = name });
        }
        public virtual int SqlQuery(string sql)
        {
            return _studentRepository.SqlQuery<int>(sql).ToList()[0];
        }

        [UnitOfWork(isTransactional: true)]
        public virtual void TransactionMethod(Student s)
        {

            _studentRepository.InsertAsync(s);
            _uowManger.Current.SaveChanges();

            throw new Exception("dc");
        }
        
     
        public virtual Task<Student> GetOneAsync(string name)
        {
            return _studentRepository.SingleAsync(m => m.Name == name);
        }
       


    }
}
