using System.Configuration;

namespace Zoo_Animals_Client.Helpers
{
    public static class ConfigHelper
    {
        public static string GetString(string key)
        {
            string value = ConfigurationManager.AppSettings[key];

            if (!string.IsNullOrWhiteSpace(value))
            {
                return value;
            }

            return null;
        }
    }
}