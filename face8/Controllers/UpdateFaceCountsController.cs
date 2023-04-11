using face8.Models;
using face8.Repository;
using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;

[ApiController]
[Route("api/[controller]")]
public class UpdateFaceCountsController : ControllerBase
{

    private readonly FaceCountRepository _faceCountRepository;

    public UpdateFaceCountsController(FaceCountRepository faceCountRepository)
    {
        _faceCountRepository = faceCountRepository;
    }

    [HttpPost]
    public async Task<IActionResult> UpdateFaceCounts([FromBody] FaceCount faceCount)
    {
        Console.WriteLine("API UpdateFaceCounts dipanggil");
        Console.WriteLine($"OutFrameCount: {faceCount.OutFrameCount}");
        if (faceCount == null)
        {
            return BadRequest("Data input tidak valid");
        }

        await _faceCountRepository.SaveOutFrameCountAsync(faceCount.OutFrameCount);
        return Ok("Data berhasil disimpan");
    }
}

