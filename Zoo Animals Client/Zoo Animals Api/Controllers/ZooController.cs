using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;
using Zoo_Animals_Api.DTO;
using Zoo_Animals_Api.Inrefaces;
using Zoo_Animals_DAL.Entitites;

namespace Zoo_Animals_Api.Controllers
{
    public class ZooController : ApiController
    {
        IZooService _zooService;

        public ZooController(IZooService animalService)
        {
            _zooService = animalService;
        }

        [HttpPost]
        public HttpResponseMessage AddAnimal(AnimalDTO animalDto)
        {
            try
            {
                var animal = Mapper.Map<AnimalDTO, Animal>(animalDto);
                _zooService.AddAnimal(animal);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong.");
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        public HttpResponseMessage GetAnimals()
        {
            var animalsDto = new List<AnimalDTO>();
            try
            {
                var animals = _zooService.GetAnimals().ToList();
                animalsDto = Mapper.Map<List<Animal>, List<AnimalDTO>>(animals);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong.");
            }

            return Request.CreateResponse(HttpStatusCode.OK, animalsDto);
        }

        [HttpGet]
        public HttpResponseMessage GetAnimal(int animalId)
        {
            try
            {
                var animal = _zooService.GetAnimal(animalId);

                if (animal != null)
                {
                    return Request.CreateResponse(HttpStatusCode.OK, animal);
                }

                return Request.CreateErrorResponse(HttpStatusCode.NotFound, "Animal not found in the our zoo.");
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong.");
            }
        }

        [HttpPost]
        public HttpResponseMessage RemoveAnimal(int animalId)
        {
            try
            {
                _zooService.RemoveAnimal(animalId);
            }
            catch (Exception)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong.");
            }

            return Request.CreateResponse(HttpStatusCode.OK);
        }

        [HttpGet]
        public HttpResponseMessage GetSpecies()
        {
            try
            {
                var species = _zooService.GetAllSpecies().ToList();
                var speciesDto = Mapper.Map<List<Species>, List<SpeciesDTO>>(species);
                return Request.CreateResponse(HttpStatusCode.OK, speciesDto);
            }
            catch (Exception ex)
            {
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong.");
            }
        }
    }
}
