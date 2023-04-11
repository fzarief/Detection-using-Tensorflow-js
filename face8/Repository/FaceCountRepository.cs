using Dapper;
using Microsoft.Data.SqlClient;
using Microsoft.Extensions.Configuration;
using System.Threading.Tasks;

namespace face8.Repository
{
    public class FaceCountRepository
    {
        private readonly IConfiguration _configuration;

        public FaceCountRepository(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public async Task SaveOutFrameCountAsync(int outFrameCount)
        {
            var connectionString = _configuration.GetConnectionString("DefaultConnection");

            using (var connection = new SqlConnection(connectionString))
            {
                await connection.OpenAsync();

                var query = @"
                INSERT INTO FaceCounts (OutFrameCount, Timestamp)
                VALUES (@OutFrameCount, @Timestamp);
            ";

                await connection.ExecuteAsync(query, new { OutFrameCount = outFrameCount, Timestamp = DateTime.Now });
            }
        }

    }
}
