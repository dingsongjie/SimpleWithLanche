namespace Domain.EntityFramework
{
    using Lanche.Domain.Repository.Entity.Auditing;
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;
    using System.ComponentModel.DataAnnotations.Schema;
    using System.Data.Entity.Spatial;

    public  class Student:Entity
    {
      
        public string Name { get; set; }
        public int Age { get; set; }
     
    }
}
