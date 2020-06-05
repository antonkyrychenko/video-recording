using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using System;
using System.Collections.Generic;
using System.IO;

namespace VideoRecorder.Controllers
{
    [Route("api/[controller]")]
    public class VideosController : ControllerBase
    {
        private static Dictionary<Guid, byte[]> _videos = new Dictionary<Guid, byte[]>();

        [HttpGet("")]
        public IActionResult GetVideos()
        {
            return Ok(_videos.Keys);
        }

        [HttpGet("{videoId}")]
        public IActionResult GetVideo(Guid videoId)
        {
            if (_videos.TryGetValue(videoId, out var video))
            {
                return File(new MemoryStream(video), "application/octet-stream", enableRangeProcessing: true);
            }

            return NotFound("No video found with specific id");
        }

        [HttpPost("")]
        public IActionResult AddVideo([FromForm] IFormFile video)
        {
            var ms = new MemoryStream();
            video.CopyTo(ms);
            _videos.TryAdd(Guid.NewGuid(), ms.ToArray());

            return Ok();
        }
    }
}