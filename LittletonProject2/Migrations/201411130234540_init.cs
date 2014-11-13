namespace LittletonProject2.Migrations
{
    using System;
    using System.Data.Entity.Migrations;
    
    public partial class init : DbMigration
    {
        public override void Up()
        {
            CreateTable(
                "dbo.ApplyModels",
                c => new
                    {
                        id = c.Guid(nullable: false),
                        ApplicationData = c.String(),
                    })
                .PrimaryKey(t => t.id);
            
        }
        
        public override void Down()
        {
            DropTable("dbo.ApplyModels");
        }
    }
}
