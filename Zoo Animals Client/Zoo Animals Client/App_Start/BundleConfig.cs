using System.Web.Optimization;

namespace Zoo_Animals_Client
{
    public class BundleConfig
    {
        // For more information on bundling, visit http://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/jquery-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Use the development version of Modernizr to develop with and learn from. Then, when you're
            // ready for production, use the build tool at http://modernizr.com to pick only the tests you need.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js",
                      "~/Scripts/respond.js"));

            bundles.Add(new ScriptBundle("~/bundles/angularjs").Include(
                      "~/Scripts/angular.js",
                      "~/Scripts/angular-sanitize.js",
                      "~/Scripts/angular-touch.js",
                      "~/Scripts/moment-with-locales.min.js",
                      "~/Scripts/angular-moment.min.js",
                      "~/Scripts/angular-ui-router.js",
                      "~/Scripts/lodash.js",
                      "~/Scripts/angular-spinner.min.js",
                      "~/Scripts/spin.min.js",
                      "~/Scripts/angular-ui/ui-bootstrap-tpls.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/zoojs")
                      .Include("~/Angular/Common.module.js")
                      .Include("~/Angular/Common.config.js")
                      .IncludeDirectory("~/Angular/Models", "*.js", false)
                      .Include("~/Areas/Zoo/App/App.core.module.js")
                      .Include("~/Areas/Zoo/App/App.module.js")
                      .Include("~/Areas/Zoo/App/App.run.js")
                      .Include("~/Areas/Zoo/App/App.config.js")
                      .Include("~/Areas/Zoo/App/Components/Components.module.js")
                      .IncludeDirectory("~/Areas/Zoo/App/Components", "*.component.js", true)
                      .IncludeDirectory("~/Areas/Zoo/App/Services", "*.js", true)
                      .Include("~/Angular/Interceptor.js"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));
        }
    }
}
