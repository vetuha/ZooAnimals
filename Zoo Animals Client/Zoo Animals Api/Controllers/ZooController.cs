using AutoMapper;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Zoo_Animals_Api.DTO;
using Zoo_Animals_Api.Inrefaces;
using Zoo_Animals_Api.Services;
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
                var animalToAdd = Mapper.Map<Animal>(animalDto);
                //validate animal
                var validationResults = ZooValidator.Validate(animalToAdd, _zooService.GetAnimals().ToList());
                if (validationResults.Count > 0)
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, String.Join("\n", validationResults));

                var newAnimal = _zooService.AddAnimal(animalToAdd);
                return Request.CreateResponse(HttpStatusCode.OK, Mapper.Map<AnimalDTO>(newAnimal));
            }
            catch (Exception)
            {
                //Some logging first
                //Logger.log(ex)
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong.");
            }
        }

        [HttpPost]
        public HttpResponseMessage EditAnimal(AnimalDTO animalDto)
        {
            try
            {
                var animal = Mapper.Map<Animal>(animalDto);
                //validate animal
                var validationResults = ZooValidator.Validate(animal, _zooService.GetAnimals().ToList());
                if (validationResults.Count > 0)
                    return Request.CreateErrorResponse(HttpStatusCode.BadRequest, String.Join("\n", validationResults));
                _zooService.EditAnimal(animal);
            }
            catch (Exception)
            {
                //Some logging first
                //Logger.log(ex)
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
                //Some logging first
                //Logger.log(ex)
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
            catch (Exception ex)
            {
                //Some logging first
                //Logger.log(ex)
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
            catch (Exception ex)
            {
                //Some logging first
                //Logger.log(ex)
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
                //Some logging first
                //Logger.log(ex)
                return Request.CreateErrorResponse(HttpStatusCode.InternalServerError, "Something went wrong.");
            }
        }
    }
}
